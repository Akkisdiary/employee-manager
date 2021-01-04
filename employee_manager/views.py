from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Employee, Manager
from .serializers import EmployeeSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = EmployeeSerializer
    model = Employee

    def perform_create(self, serializer):
        return serializer.save(manager=self.request.user)

    def get_queryset(self):
        queryset = Employee.objects.all()
        user = self.request.user
        return queryset.filter(manager=user)
