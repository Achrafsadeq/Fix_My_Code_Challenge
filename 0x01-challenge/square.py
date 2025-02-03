#!/usr/bin/python3
"""
square module
Defines a Square class with attributes and methods
to calculate area and perimeter.
"""


class Square():
    """ a square class"""
    width = 0
    height = 0

    def __init__(self, *args, **kwargs):
        """ the init for the square class"""
        for key, value in kwargs.items():
            setattr(self, key, value)

    def area_of_my_square(self):
        """ Area of the square """
        return self.width * self.height

    def permiter_of_my_square(self):
        """ Calculates and returns the perimeter of the square. """
        return (self.width * 2) + (self.height * 2)

    def __str__(self):
        """ Returns a string representation of the Square object."""
        return "{}/{}".format(self.width, self.height)


if __name__ == "__main__":
    s = Square(width=12, height=9)
    print(s)
    print(s.area_of_my_square())
    print(s.permiter_of_my_square())
