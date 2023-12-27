import json
from faker import Faker
import random
import datetime

fake = Faker()

def generate_random_post():
    post = {
        "id": fake.uuid4(),
        "title": fake.sentence(),
        "content": fake.paragraph(),
        "category": random.choice(["Announcement", "Event", "News", "Academic", "Discussion"]),
        "author": fake.name(),
        "timestamp": fake.date_time_this_decade().isoformat(),
        "views": random.randint(0, 1000),
        "likes": random.randint(0, 500),
        "comments": generate_random_comments(),
    }
    return post

def generate_random_comments():
    num_comments = random.randint(0, 10)
    comments = []
    for _ in range(num_comments):
        comment = {
            "id": fake.uuid4(),
            "author": fake.name(),
            "content": fake.paragraph(),
            "timestamp": fake.date_time_this_decade().isoformat(),
            "likes": random.randint(0, 100),
        }
        comments.append(comment)
    return comments

def generate_random_posts(num_posts):
    posts = []
    for _ in range(num_posts):
        post = generate_random_post()
        posts.append(post)
    return posts

if __name__ == "__main__":
    num_posts_to_generate = 20
    posts_data = generate_random_posts(num_posts_to_generate)

    with open("random_posts_data.json", "w") as json_file:
        json.dump(posts_data, json_file, indent=2)

    print(f"{num_posts_to_generate} random posts data generated and saved to 'random_posts_data.json'.")
