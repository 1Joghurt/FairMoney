from datetime import datetime

from models.accounting import Accounting
from models.payment import Payment
from models.user import User


class Group:
    """Group mode."""

    def __init__(self,
                 title: str,
                 closed: bool,
                 payments: list[Payment],
                 accountings: list[Accounting],
                 users: list[User],
                 created_at: datetime,
                 created_by: User,
                 closed_at: datetime = None,
                 closed_by: User = None,
                 uuid: str = None) -> None:
        self.uuid = uuid
        self.title = title
        self.closed = closed
        self.payments = payments
        self.accountings = accountings
        self.users = users

        self.created_at = created_at
        self.created_by = created_by

        self.closed_at = closed_at
        self.closed_by = closed_by

    def __str__(self) -> str:
        """
        Returns the string representation of the Group object.

        Returns:
            str: The details of the group.
        """
        return (f"{self.title} {'(Closed)' if self.closed else ''} (User: {len(self.users)}, "
                f"Payments: {len(self.payments)}, Accountings: {len(self.accountings)})")
