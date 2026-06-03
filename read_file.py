import sys

def read_full_file(filepath):
    try:
        with open(filepath, 'r') as f:
            print(f.read())
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        read_full_file(sys.argv[1])
    else:
        print("Provide a filepath")
