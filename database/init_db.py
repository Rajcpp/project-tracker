from database.setup import engine, Base
import database.model  # VERY IMPORTANT

Base.metadata.create_all(bind=engine)