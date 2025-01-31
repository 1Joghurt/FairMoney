from models.user import User


class Transaction:
    """Transaction model."""

    def __init__(self,
                 payment_from: User,
                 payment_to: User,
                 amount: float,
                 uuid: str = None) -> None:
        self.uuid = uuid
        self.payment_from = payment_from
        self.payment_to = payment_to
        self.amount = amount

    def __str__(self) -> str:
        """
        Returns the string representation of the Transaction object.

        Returns:
            str: The details of the transaction.
        """
        return f"{self.payment_from} -> {self.payment_to} ({self.amount} €) "
