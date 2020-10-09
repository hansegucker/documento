from django.core.validators import FileExtensionValidator
from django.db import models
from django.db.models import Max
from django.utils.text import slugify
from django.utils.translation import gettext as _


def rename_document_pdf(instance: "Document", filename: str):
    return instance.generate_filename()


class Document(models.Model):
    name = models.CharField(max_length=255, verbose_name=_("Document name"))
    file = models.FileField(
        _("PDF file"),
        validators=[FileExtensionValidator(allowed_extensions=["pdf"])],
        upload_to=rename_document_pdf,
        null=True,
        blank=True,
    )
    added_at = models.DateTimeField(auto_now_add=True)
    is_in_progress = models.BooleanField(default=False)

    @property
    def barcode(self):
        if self.id:
            id = self.id
        else:
            id = Document.get_next_id()
        return "{num:08d}".format(num=id)

    @classmethod
    def get_next_id(cls):
        return (
            cls.objects.aggregate(Max("id"))["id__max"] + 1
            if cls.objects.all().exists()
            else 1
        )

    @property
    def barcode_record(self):
        return {"barcode": self.barcode, "name": self.name}

    def generate_barcode_label(self):
        from blabel import LabelWriter

        label_writer = LabelWriter(
            "barcode_template.html", default_stylesheets=("barcode_style.css",),
        )
        records = [self.barcode_record]

        return label_writer.write_labels(records, target=None)

    @property
    def slug(self):
        return slugify(f"{self.added_at}-{self.name}")

    def generate_filename(self):
        return f"{slugify(self.slug)}.pdf"
