FROM mcr.microsoft.com/devcontainers/base:jammy

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    libssl-dev \
    pkg-config \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Install Node.js (might be needed for some scripts)
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs

# Switch to the vscode user provided by the base image
USER vscode

# Install Rust for the vscode user
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Update Rust to the latest stable version
RUN $HOME/.cargo/bin/rustup update && $HOME/.cargo/bin/rustup default stable

# Add wasm target
RUN $HOME/.cargo/bin/rustup target add wasm32-unknown-unknown

# Install Stylus SDK using Cargo
RUN RUSTFLAGS="-C link-args=-rdynamic" $HOME/.cargo/bin/cargo install --force cargo-stylus

# Add Cargo to PATH
ENV PATH="$HOME/.cargo/bin:$PATH"

# Set a default command for the container
CMD ["/bin/bash"]
