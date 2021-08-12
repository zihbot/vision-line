# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from api.models.base_model_ import Model
from api import util


class Node(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, name=None, inputs=None):  # noqa: E501
        """Node - a model defined in OpenAPI

        :param name: The name of this Node.  # noqa: E501
        :type name: str
        :param inputs: The inputs of this Node.  # noqa: E501
        :type inputs: object
        """
        self.openapi_types = {
            'name': str,
            'inputs': object
        }

        self.attribute_map = {
            'name': 'name',
            'inputs': 'inputs'
        }

        self._name = name
        self._inputs = inputs

    @classmethod
    def from_dict(cls, dikt) -> 'Node':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Node of this Node.  # noqa: E501
        :rtype: Node
        """
        return util.deserialize_model(dikt, cls)

    @property
    def name(self):
        """Gets the name of this Node.

        Name of the implemented function  # noqa: E501

        :return: The name of this Node.
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name):
        """Sets the name of this Node.

        Name of the implemented function  # noqa: E501

        :param name: The name of this Node.
        :type name: str
        """

        self._name = name

    @property
    def inputs(self):
        """Gets the inputs of this Node.

        Input key-value pairs as object  # noqa: E501

        :return: The inputs of this Node.
        :rtype: object
        """
        return self._inputs

    @inputs.setter
    def inputs(self, inputs):
        """Sets the inputs of this Node.

        Input key-value pairs as object  # noqa: E501

        :param inputs: The inputs of this Node.
        :type inputs: object
        """

        self._inputs = inputs