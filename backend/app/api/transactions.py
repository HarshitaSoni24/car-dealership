from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.transaction import Transaction
from app.schemas.transaction import TransactionResponse # Need to create this
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/transactions", tags=["Transactions"])

@router.get("/my-purchases", response_model=List[TransactionResponse])
def get_my_purchases(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Transaction).filter(Transaction.user_id == current_user.id).all()
