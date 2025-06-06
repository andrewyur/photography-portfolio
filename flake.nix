{
    inputs = {
        nixpkgs.url = "nixpkgs/nixos-unstable";
        flake-utils.url = "github:numtide/flake-utils";
    };

    outputs = {self, flake-utils, nixpkgs}: 
        flake-utils.lib.eachDefaultSystem (system:
        let
            pkgs = import nixpkgs { inherit system; };
        in {
            devShell = pkgs.mkShell {
                packages = with pkgs; [
                    nodejs_24
                ];
                shellHook = "zsh";
            };
        }
    );
}
