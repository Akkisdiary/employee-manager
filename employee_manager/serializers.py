from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.utils import setup_user_email
from allauth.account.adapter import get_adapter
from rest_framework import serializers
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'email', 'first_name',
                  'last_name', 'address', 'dob', 'company', 'mobile', 'city')


class ManagerRegisterSerializer(RegisterSerializer):
    address = serializers.CharField(
        required=True,
        max_length=150,
    )
    dob = serializers.DateField(required=True)
    company = serializers.CharField(
        required=True,
        max_length=50,
    )
    mobile = serializers.CharField(required=True, max_length=12,)
    city = serializers.CharField(required=True, max_length=50,)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['first_name'] = self.validated_data.get('first_name', '')
        data_dict['last_name'] = self.validated_data.get('last_name', '')
        data_dict['address'] = self.validated_data.get('address', '')
        data_dict['dob'] = self.validated_data.get('dob', '')
        data_dict['company'] = self.validated_data.get('company', '')
        data_dict['mobile'] = self.validated_data.get('mobile', '')
        data_dict['city'] = self.validated_data.get('city', '')
        return data_dict
