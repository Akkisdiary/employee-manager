from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AbstractUser


class Manager(AbstractUser):
    address = models.CharField(max_length=150, blank=True)
    dob = models.DateField(blank=True, null=True)
    company = models.CharField(blank=True, max_length=100)
    mobile = models.CharField(max_length=10, blank=True)
    city = models.CharField(blank=True, max_length=50)


class Employee(models.Model):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=150, blank=True)
    dob = models.DateField(blank=True, null=True)
    company = models.CharField(blank=True, max_length=100)
    mobile = models.CharField(max_length=10, blank=True)
    city = models.CharField(blank=True, max_length=50)
    manager = models.ForeignKey(
        Manager, default="manager", on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
