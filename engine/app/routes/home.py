from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def home():
    return{
        "status":"success",
        "message":"hello world"
    }