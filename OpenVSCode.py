import subprocess

def open_vscode():
    try:
        # Define the full command as a string
        command = 'code . --no-sandbox --user-data-dir="~/.vscode-root"'
        
        # Run the command
        subprocess.run(command, check=True, shell=True)
        print("VS Code opened with --no-sandbox in the current directory.")
    
    except subprocess.CalledProcessError as e:
        print(f"Error occurred: {e}")
    except FileNotFoundError:
        print("VS Code command 'code' not found. Make sure it's installed and added to your PATH.")

if __name__ == "__main__":
    open_vscode()


