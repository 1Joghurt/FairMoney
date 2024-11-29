from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship

from src.models.orm.orm_base import ORMBase


class Group(ORMBase):
    __tablename__ = "group"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    uuid: Mapped[str]
    title: Mapped[str]
    closed: Mapped[bool]

    created_at: Mapped[datetime]
    created_by: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=True)

    closed_at: Mapped[datetime]
    closed_by: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=True)

    # Relationship
    users: Mapped[list["User"]] = relationship(back_populates="group",
                                               foreign_keys="User.group_id",
                                               post_update=True)

    payments: Mapped[list["Payment"]] = relationship(back_populates="group")
    accountings: Mapped[list["Accounting"]] = relationship(back_populates="group")

    created_by_user: Mapped["User"] = relationship(back_populates="group_created",
                                                   foreign_keys=created_by,
                                                   post_update=True)

    closed_by_user: Mapped["User"] = relationship(back_populates="group_closed",
                                                  foreign_keys=closed_by)