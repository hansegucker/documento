import os
import time
import uuid
from decimal import Decimal

from django.conf import settings
from PyPDF2 import PdfFileMerger

import pdf2image
import pytesseract
from celery import shared_task
from celery_progress.backend import PROGRESS_STATE, AbstractProgressRecorder
from documents.models import Document


class ProgressRecorder(AbstractProgressRecorder):
    def __init__(self, task):
        self.task = task

    def set_progress(self, current, total, stage=1, description=""):
        percent = 0
        if total > 0:
            percent = (Decimal(current) / Decimal(total)) * Decimal(100)
            percent = float(round(percent, 2))
        self.task.update_state(
            state=PROGRESS_STATE,
            meta={
                "current": current,
                "total": total,
                "percent": percent,
                "stage": stage,
                "description": description,
            },
        )


@shared_task(bind=True)
def ocr_task(self, pk):
    document = Document.objects.get(pk=pk)

    progress_recorder = ProgressRecorder(self)
    progress_recorder.set_progress(0, 100, stage=1, description="pdf_to_images")
    images = pdf2image.convert_from_path(document.file.path, dpi=300)
    progress_recorder.set_progress(100, 100, stage=1, description="pdf_to_images")
    images_count = len(images)
    time.sleep(1)

    merger = PdfFileMerger()
    for i, image in enumerate(images):
        progress_recorder.set_progress(
            i, images_count, stage=2, description="ocr",
        )
        pdf = pytesseract.image_to_pdf_or_hocr(image, extension="pdf", lang="deu")
        filename = os.path.join(
            settings.MEDIA_ROOT, "tmp-ocr-{}.pdf".format(uuid.uuid4())
        )
        with open(filename, "wb") as f:
            f.write(pdf)
        with open(filename, "rb") as f:
            merger.append(fileobj=f)

        # Write merged PDF to ocr.pdf
        output = open(os.path.join(settings.MEDIA_ROOT, "tmp-ocr.pdf"), "wb")
        merger.write(output)
        output.close()
        progress_recorder.set_progress(
            i + 1, images_count, stage=2, description="ocr",
        )
    return "done"
