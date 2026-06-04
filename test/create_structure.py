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
    
    "src/components/auth/signup-form.tsx",
    "src/components/layout/footer.tsx",
    "src/components/layout/navber/logo.tsx",
    "src/components/layout/navber/nav-menu.tsx",
    "src/components/layout/navber/navbar.tsx",
    "src/components/layout/navber/navigation-menu.tsx",
    "src/components/layout/navber/navigation-sheet.tsx",
    "src/components/provider/providers.tsx",
    "src/components/provider/theme-provider.tsx",
    "src/components/types/userForm.d.ts",
    "src/components/ui/alert-dialog.tsx",
    "src/components/ui/avatar.tsx",
    "src/components/ui/badge.tsx",
    "src/components/ui/button.tsx",
    "src/components/ui/card.tsx",
    "src/components/ui/dropdown-menu.tsx",
    "src/components/ui/field.tsx",
    "src/components/ui/input-group.tsx",
    "src/components/ui/input.tsx",
    "src/components/ui/input-group.tsx",
    "src/components/ui/field.tsx",
    "src/components/ui/separator.tsx",
    "src/components/ui/sheet.tsx",
    "src/components/ui/sonner.tsx",
    "src/components/ui/textarea.tsx",
    "src/env.ts",
    "src/lib/auth-client.ts",
    "src/lib/utils.ts",
    "test/admin.ts",
    "test/proxy.ts",

]

if __name__ == "__main__":
    print("🚀 Creating project structure...\n")
    create_files_and_folders(paths)
    print("\n🎉 All done!")