import requests


def reset_server_test_data():
    r = requests.post('http://localhost:8000/api/v1/reset-sample-data/')
    if r.status_code == 200:
        exit(0)
    exit(1)


if __name__ == "__main__":
    reset_server_test_data()
