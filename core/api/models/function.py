# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from api.models.base_model_ import Model
from api.models.function_input import FunctionInput
from api import util

from api.models.function_input import FunctionInput  # noqa: E501

class Function(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, name:str = None, display:str = None, inputs:List[FunctionInput] = None):  # noqa: E501
        """Function - a model defined in OpenAPI

        :param name: The name of this Function.  # noqa: E501
        :type name: str
        :param display: The display of this Function.  # noqa: E501
        :type display: str
        :param inputs: The inputs of this Function.  # noqa: E501
        :type inputs: List[FunctionInput]
        """
        self.openapi_types = {
            'name': str,
            'display': str,
            'inputs': List[FunctionInput]
        }

        self.attribute_map = {
            'name': 'name',
            'display': 'display',
            'inputs': 'inputs'
        }

        self._name = name
        self._display = display
        self._inputs = inputs

    @classmethod
    def from_dict(cls, dikt) -> 'Function':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Function of this Function.  # noqa: E501
        :rtype: Function
        """
        return util.deserialize_model(dikt, cls)

    @property
    def name(self):
        """Gets the name of this Function.


        :return: The name of this Function.
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name):
        """Sets the name of this Function.


        :param name: The name of this Function.
        :type name: str
        """

        self._name = name

    @property
    def display(self):
        """Gets the display of this Function.


        :return: The display of this Function.
        :rtype: str
        """
        return self._display

    @display.setter
    def display(self, display):
        """Sets the display of this Function.


        :param display: The display of this Function.
        :type display: str
        """

        self._display = display

    @property
    def inputs(self):
        """Gets the inputs of this Function.


        :return: The inputs of this Function.
        :rtype: List[FunctionInput]
        """
        return self._inputs

    @inputs.setter
    def inputs(self, inputs):
        """Sets the inputs of this Function.


        :param inputs: The inputs of this Function.
        :type inputs: List[FunctionInput]
        """

        self._inputs = inputs
