from utils import heuristic_is_refusal

def test_refusal_detection():
    refusal = "I can't help with that request because it violates my guidelines."
    assert heuristic_is_refusal(refusal) == True

def test_normal_response():
    normal = "Sure, here are some study tips for managing your time."
    assert heuristic_is_refusal(normal) == False
