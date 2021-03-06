# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from api.models.base_model_ import Model
from api import util


class FunctionInput(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, name:str = None, display:str = None, type:str = None, values:List[object] = None, regex:str = None):  # noqa: E501
        """FunctionInput - a model defined in OpenAPI

        :param name: The name of this FunctionInput.  # noqa: E501
        :type name: str
        :param display: The display of this FunctionInput.  # noqa: E501
        :type display: str
        :param type: The type of this FunctionInput.  # noqa: E501
        :type type: str
        :param values: The values of this FunctionInput.  # noqa: E501
        :type values: List[object]
        :param regex: The regex of this FunctionInput.  # noqa: E501
        :type regex: str
        """
        self.openapi_types = {
            'name': str,
            'display': str,
            'type': str,
            'values': List[object],
            'regex': str
        }

        self.attribute_map = {
            'name': 'name',
            'display': 'display',
            'type': 'type',
            'values': 'values',
            'regex': 'regex'
        }

        self._name = name
        self._display = display
        self._type = type
        self._values = values
        self._regex = regex

    @classmethod
    def from_dict(cls, dikt) -> 'FunctionInput':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The FunctionInput of this FunctionInput.  # noqa: E501
        :rtype: FunctionInput
        """
        return util.deserialize_model(dikt, cls)

    @property
    def name(self):
        """Gets the name of this FunctionInput.


        :return: The name of this FunctionInput.
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name):
        """Sets the name of this FunctionInput.


        :param name: The name of this FunctionInput.
        :type name: str
        """

        self._name = name

    @property
    def display(self):
        """Gets the display of this FunctionInput.


        :return: The display of this FunctionInput.
        :rtype: str
        """
        return self._display

    @display.setter
    def display(self, display):
        """Sets the display of this FunctionInput.


        :param display: The display of this FunctionInput.
        :type display: str
        """

        self._display = display

    @property
    def type(self):
        """Gets the type of this FunctionInput.


        :return: The type of this FunctionInput.
        :rtype: str
        """
        return self._type

    @type.setter
    def type(self, type):
        """Sets the type of this FunctionInput.


        :param type: The type of this FunctionInput.
        :type type: str
        """

        self._type = type

    @property
    def values(self):
        """Gets the values of this FunctionInput.


        :return: The values of this FunctionInput.
        :rtype: List[object]
        """
        return self._values

    @values.setter
    def values(self, values):
        """Sets the values of this FunctionInput.


        :param values: The values of this FunctionInput.
        :type values: List[object]
        """

        self._values = values

    @property
    def regex(self):
        """Gets the regex of this FunctionInput.


        :return: The regex of this FunctionInput.
        :rtype: str
        """
        return self._regex

    @regex.setter
    def regex(self, regex):
        """Sets the regex of this FunctionInput.


        :param regex: The regex of this FunctionInput.
        :type regex: str
        """

        self._regex = regex
