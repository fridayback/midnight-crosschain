
#!/bin/bash

# 检查dist目录是否存在
if [ ! -d "dist" ]; then
  echo "Error: dist directory not found"
  exit 1
fi

# 查找并重命名所有.js文件
find dist -type f -name "*.js" | while read -r file; do
  # 获取文件所在目录
  dir=$(dirname "$file")
  # 获取不带扩展名的文件名
  base=$(basename "$file" .js)
  # 新文件名
  new_file="$dir/$base.cjs"
  
  echo "Renaming: $file -> $new_file"
  mv "$file" "$new_file"
done

echo "All .js files in dist have been renamed to .cjs"
