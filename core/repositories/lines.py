from sqlalchemy.sql.expression import delete, select
from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import JSON, BigInteger, Integer, String
from .database import *

class LineORM(Base):
    __tablename__ = 'lines'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    last_change = Column(BigInteger)
    nodes = Column(JSON)

    def insert(self):
        self.id = None
        db_session.add(self)
        db_session.commit()
        return self.find_by_id(self.id)

    def delete(self):
        db_session.delete(self)
        db_session.commit()

    @classmethod
    def find_by_id(cls, id: int) -> 'LineORM':
        return db_session.execute(select(LineORM).where(LineORM.id == id)).scalars().first()
