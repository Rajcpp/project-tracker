from setup import engine, Base
import model  # VERY IMPORTANT

Base.metadata.create_all(bind=engine)