import os

def find_project_root(start_dir=None):
    """
    Find the project root by looking for common markers (package.json, next.config.js, etc.)
    """
    if start_dir is None:
        start_dir = os.getcwd()

    current_dir = os.path.abspath(start_dir)

    while current_dir != os.path.dirname(current_dir):  # Stop at filesystem root
        markers = [
            'package.json',
            'next.config.js',
            'next.config.mjs',
            'tsconfig.json',
            '.git',
        ]
        
        for marker in markers:
            if os.path.exists(os.path.join(current_dir, marker)):
                return current_dir
        
        current_dir = os.path.dirname(current_dir)
    
    # Fallback: return current directory if no root found
    return os.getcwd()


def create_files_and_folders(paths, root=None):
    if root is None:
        root = find_project_root()
    
    print(f"📍 Project root detected: {root}\n")
    
    for path in paths:
        # Join path with root
        full_path = os.path.join(root, path)
        directory = os.path.dirname(full_path)
        
        if directory:
            os.makedirs(directory, exist_ok=True)
            print(f"✅ Folder ensured: {directory}")
        
        if not os.path.exists(full_path):
            with open(full_path, 'w', encoding='utf-8') as f:
                pass
            print(f"✅ File created: {full_path}")
        else:
            print(f"⚡ Already exists: {full_path}")


# ========================
# Add your paths here (relative to project root)
# ========================
paths = [
 
    "src/components/pages/order/orderCart.tsx",
    "src/components/pages/order/checkOut.tsx",
    "src/components/pages/order/getMyOrders.tsx"
    "src/components/ui/radio-group.tsx"

]

if __name__ == "__main__":
    print("🚀 Creating project structure...\n")
    create_files_and_folders(paths)
    print("\n🎉 All done!")