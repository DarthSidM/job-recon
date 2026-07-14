import json
from uuid import uuid4, UUID

from redis import Redis


class MemoryLLM:
    TTL = 1800

    def __init__(self):
        self.redis = Redis(
            host="localhost",
            port=6379,
            db=1,
            decode_responses=True
        )
        self.session_id: UUID | None = None

    def _key(self):
        return f"resume-builder:{self.session_id}"

    def create_session(self) -> UUID:
        self.session_id = uuid4()

        self.redis.set(
            self._key(),
            json.dumps([]),
            ex=self.TTL
        )

        return self.session_id

    def load_session(self, session_id: UUID):
        self.session_id = session_id

    def get_history(self) -> list[dict]:
        history = self.redis.get(self._key())

        if history is None:
            return []

        self.redis.expire(self._key(), self.TTL)

        return json.loads(history)

    def save_history(self, message: str, role: str):
        history = self.get_history()

        history.append(
            {
                "role": role,
                "content": message
            }
        )

        self.redis.set(
            self._key(),
            json.dumps(history),
            ex=self.TTL
        )