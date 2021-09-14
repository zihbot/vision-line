import sqlalchemy
from sqlalchemy.engine.base import Connection
from sqlalchemy.orm.scoping import scoped_session
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy.sql.expression import text
from config import settings
from sqlalchemy.ext.declarative import declarative_base

engine = sqlalchemy.create_engine('postgresql://'
    + settings.database.username + ':'
    + settings.database.password + '@'
    + settings.database.host + ':'
    + settings.database.port + '/'
    + settings.database.name)

db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    Base.metadata.create_all(bind=engine)

def teardown_db():
    db_session.remove()

#with engine.connect() as conn:
#    assert isinstance(conn, Connection)
#    print(conn.execute(text('select * from lines')).fetchall())
#print('CONFIGDB:', settings.database)
#print('CONFIG:', config.__dict__)