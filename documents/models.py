from django.db import models
from django.db.models import Max
from django.utils.text import slugify
from django.utils.translation import gettext as _


class Document(models.Model):
    name = models.CharField(max_length=255, verbose_name=_("Document name"))
    # path = TextField()
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

    # def generate_barcode_label(self):
    #     from blabel import LabelWriter
    #
    #     label_writer = LabelWriter(
    #         "barcode_template.html", default_stylesheets=("barcode_style.css",),
    #     )
    #     records = [self.barcode_record]
    #
    #     label_writer.write_labels(records, target="barcode.pdf")

    # def print_barcode_label(self):
    #     self.generate_barcode_label()
    #     subprocess.Popen(
    #         ["lp", "-d", PRINTER_NAME, "barcode.pdf"],
    #         stderr=subprocess.DEVNULL,
    #         stdout=subprocess.DEVNULL,
    #     )

    @property
    def slug(self):
        return slugify(f"{self.added_at}-{self.name}")

    def generate_filename(self):
        return f"{slugify(self.slug)}.pdf"

    # def generate_path(self):
    #     return os.path.join(os.getcwd(), "documents", self.generate_filename())
    #
    # def generate_tmp_path(self, count: int):
    #     return os.path.join("/tmp", f"dms-{self.id}-{count}.pdf")
