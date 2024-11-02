{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz") {} }:

pkgs.mkShell {

	buildInputs = with pkgs; [
		# put your packages here!
		python313Full nodejs-18_x  yarn nmap mysql2
	];
	
	
}
