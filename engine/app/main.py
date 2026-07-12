from fastapi import FastAPI
import uvicorn
from app.routes.resume import router as resume_router
from app.routes.home import router as home_router
from app.routes.matcher import router as matcher_router


app = FastAPI()

app.include_router(
    resume_router,
    prefix="/api/v2"
)
app.include_router(
    home_router,
    prefix=""
)
app.include_router(
    matcher_router,
    prefix=""
)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)