from rest_framework import serializers
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'email', 'first_name',
                  'last_name', 'address', 'dob', 'company', 'mobile', 'city')
