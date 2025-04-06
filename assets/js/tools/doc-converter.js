document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const convertBtn = document.getElementById('convertBtn');
    const progressSection = document.getElementById('progressSection');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const resultSection = document.getElementById('resultSection');
    const resultList = document.getElementById('resultList');

    // 文件列表
    let files = [];

    // 拖拽上传
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary)';
        dropZone.style.backgroundColor = 'rgba(var(--primary-rgb), 0.1)';
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '';
        dropZone.style.backgroundColor = '';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '';
        dropZone.style.backgroundColor = '';
        
        const newFiles = Array.from(e.dataTransfer.files);
        addFiles(newFiles);
    });

    // 点击上传
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const newFiles = Array.from(e.target.files);
        addFiles(newFiles);
    });

    // 添加文件
    function addFiles(newFiles) {
        const conversionType = document.querySelector('input[name="conversion-type"]:checked').value;
        
        newFiles.forEach(file => {
            // 检查文件类型
            if (conversionType === 'dos2pdf' && !file.name.endsWith('.txt')) {
                showResult('error', `不支持的文件类型: ${file.name}，请上传.txt文件`);
                return;
            }
            
            if (conversionType === 'pdf2dos' && !file.name.endsWith('.pdf')) {
                showResult('error', `不支持的文件类型: ${file.name}，请上传.pdf文件`);
                return;
            }
            
            // 检查是否已存在
            if (files.some(f => f.name === file.name)) {
                showResult('error', `文件已存在: ${file.name}`);
                return;
            }
            
            // 添加文件
            files.push(file);
            
            // 创建文件项
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-name">
                    <i class="ph ph-file-text"></i>
                    <span>${file.name}</span>
                </div>
                <i class="ph ph-x remove-file" data-name="${file.name}"></i>
            `;
            
            fileList.appendChild(fileItem);
        });
    }

    // 移除文件
    fileList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-file')) {
            const fileName = e.target.dataset.name;
            files = files.filter(f => f.name !== fileName);
            e.target.parentElement.remove();
        }
    });

    // 转换类型改变
    document.querySelectorAll('input[name="conversion-type"]').forEach(radio => {
        radio.addEventListener('change', () => {
            // 清空文件列表
            files = [];
            fileList.innerHTML = '';
            resultList.innerHTML = '';
            resultSection.style.display = 'none';
        });
    });

    // 开始转换
    convertBtn.addEventListener('click', async () => {
        if (files.length === 0) {
            showResult('error', '请先添加文件');
            return;
        }

        const conversionType = document.querySelector('input[name="conversion-type"]:checked').value;
        const preserveFormat = document.getElementById('preserveFormat').checked;

        // 显示进度条
        progressSection.style.display = 'block';
        resultSection.style.display = 'block';
        resultList.innerHTML = '';

        // 禁用按钮
        convertBtn.disabled = true;

        try {
            // 创建FormData
            const formData = new FormData();
            files.forEach(file => {
                formData.append('files', file);
            });
            formData.append('conversionType', conversionType);
            formData.append('preserveFormat', preserveFormat);

            // 发送请求
            const response = await fetch('http://localhost:5000/api/convert', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('转换失败');
            }

            const result = await response.json();

            // 更新进度
            updateProgress(100);

            // 显示结果
            if (result.success) {
                showResult('success', `成功转换 ${result.successCount} 个文件`);
                result.files.forEach(file => {
                    showResult('success', `${file.name} -> ${file.outputName}`);
                });
            } else {
                showResult('error', result.message || '转换失败');
            }
        } catch (error) {
            showResult('error', error.message);
        } finally {
            // 启用按钮
            convertBtn.disabled = false;
        }
    });

    // 更新进度
    function updateProgress(percent) {
        progressBar.style.width = `${percent}%`;
        progressText.textContent = `${percent}%`;
    }

    // 显示结果
    function showResult(type, message) {
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${type}`;
        resultItem.textContent = message;
        resultList.appendChild(resultItem);
        resultList.scrollTop = resultList.scrollHeight;
    }
}); 