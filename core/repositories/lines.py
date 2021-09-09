from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import JSON, BigInteger, Integer, String
from .database import *

class LineORM(Base):
    __tablename__ = 'lines'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    last_change = Column(BigInteger)
    nodes = Column(JSON)