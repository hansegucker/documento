from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404

from .models import Document


def barcode_label(request: HttpRequest, pk: int) -> HttpResponse:
    """Generate barcode label for a document as PDF and return file."""
    document = get_object_or_404(Document, pk=pk)
    pdf = document.generate_barcode_label()
    return HttpResponse(pdf, content_type="application/pdf")
