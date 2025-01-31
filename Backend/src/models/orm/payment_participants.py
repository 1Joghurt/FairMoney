from sqlalchemy import ForeignKey, Table, Column

from models.orm.orm_base import ORMBase

# Table for Payment-Participants n:m Mapping.
payment_participants_table = Table(
    "payment_participants",
    ORMBase.metadata,
    Column("participant_id", ForeignKey("user.id")),
    Column("payment_id", ForeignKey("payment.id")),
)
