{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz") {} }:

pkgs.mkShell {

	buildInputs = with pkgs; [
		# put your packages here!
		python313Full nodejs-18_x  yarn nmap  mariadb 
	];
	
	shellHook = ''
    # Install npm packages on shell load if package.json is present
    if [ -f package.json ]; then
      echo "Installing npm packages..."
      npm install
    fi
    
     MYSQL_BASEDIR=${pkgs.mariadb}
    MYSQL_HOME="$PWD/mysql"
    MYSQL_DATADIR="$MYSQL_HOME/data"
    export MYSQL_UNIX_PORT="$MYSQL_HOME/mysql.sock"
    MYSQL_PID_FILE="$MYSQL_HOME/mysql.pid"
    alias mysql='mysql -u root'

    if [ ! -d "$MYSQL_HOME" ]; then
      # Make sure to use normal authentication method otherwise we can only
      # connect with unix account. But users do not actually exists in nix.
      mysql_install_db --no-defaults --auth-root-authentication-method=normal \
        --datadir="$MYSQL_DATADIR" --basedir="$MYSQL_BASEDIR" \
        --pid-file="$MYSQL_PID_FILE"
    fi

    # Starts the daemon
    # - Don't load mariadb global defaults in /etc with `--no-defaults`
    # - Disable networking with `--skip-networking` and only use the socket so 
    #   multiple instances can run at once
    mysqld --no-defaults --skip-networking --datadir="$MYSQL_DATADIR" --pid-file="$MYSQL_PID_FILE" \
      --socket="$MYSQL_UNIX_PORT" 2> "$MYSQL_HOME/mysql.log" &
    MYSQL_PID=$!

    finish()
    {
      mysqladmin -u root --socket="$MYSQL_UNIX_PORT" shutdown
      kill $MYSQL_PID
      wait $MYSQL_PID
    }
    trap finish EXIT
  '';

	
}
