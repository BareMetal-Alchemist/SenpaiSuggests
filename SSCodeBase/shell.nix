{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {

	buildInputs = with pkgs; [
		# put your packages here!
		python313 pkgs.nodejs pkgs.mysql pkgs.yarn 
	];
	
	shellHook = ''

	# Install project dependencies if package.json exists
    if [ -f ./package.json ]; then
      echo "Installing Node.js dependencies..."
      npm install
    fi
	

	# Create a MySQL data directory if it doesn't exist
    if [ ! -d ./mysql-data ]; then
      echo "Initializing MySQL data directory..."
      mysql_install_db --datadir=./mysql-data
    fi

    # Start the MySQL server on a specific port (default: 3306)
    echo "Starting MySQL server on port 3306..."
    mysqld --datadir=./mysql-data --socket=./mysql.sock --port=3306 --bind-address=0.0.0.0 &

    # Give the server some time to start
    sleep 5

    echo "MySQL server is running. You can connect using 'mysql' command or from MySQL Workbench on localhost:3306."
  '';
}
