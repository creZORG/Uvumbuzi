import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CoursePage.css';

// A reusable code block component with a copy button
const CodeBlock = ({ children }) => {
    const [isCopied, setIsCopied] = useState(false);
    
    const handleCopy = () => {
        // Use a secure way to copy text
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(children).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000); // Reset button after 2 seconds
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = children;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <div className="code-block-container">
            <button className="copy-button" onClick={handleCopy}>
                {isCopied ? <i className="fas fa-check"></i> : <i className="fas fa-copy"></i>}
            </button>
            <div className="code-block">
                <pre><code>{children}</code></pre>
            </div>
        </div>
    );
};

const AutomationProjectCourse = () => {
    return (
        <section className="course-page">
            <div className="container">
                <div className="course-header">
                    <i className="fas fa-robot course-header-icon"></i>
                    <div className="course-header-content">
                        <h1 className="course-title">Automation with Python: Your First Project</h1>
                        <p className="course-description">
                            Welcome to your first automation project! We'll use Python to build a practical tool that organizes files on your computer. This hands-on approach will teach you core concepts in a way that's easy to understand.
                        </p>
                    </div>
                </div>

                <div className="course-module">
                    <h2 className="module-title">Module 1: The Automation Mindset</h2>
                    <p className="module-intro">
                        Before we write any code, let's understand what automation is and why it's so powerful. Automation is simply using a program to perform a task that you would normally do manually. It's about saving time, reducing errors, and making your digital life more efficient.
                    </p>

                    <h3 className="sub-heading">What We'll Build</h3>
                    <p>
                        Our project will be a **file organizer**. You'll create a script that automatically sorts files in a folder into sub-folders based on their file type. For example, all your `PDF` files will go into a "PDFs" folder, all your `JPG` files into a "JPGs" folder, and so on.
                    </p>

                    <h3 className="sub-heading">What You'll Need</h3>
                    <ul className="module-list">
                        <li><strong>Python 3:</strong> The latest version is recommended.</li>
                        <li><strong>A Code Editor:</strong> Visual Studio Code is a great choice.</li>
                        <li><strong>A "Messy" Folder:</strong> Create a new folder on your desktop and fill it with a mix of different file types (e.g., `resume.pdf`, `photo.jpg`, `notes.txt`).</li>
                    </ul>
                </div>

                <div className="course-module">
                    <h2 className="module-title">Module 2: Project Setup and Code</h2>
                    <p className="module-intro">
                        Let's set up our project and write the code for our file organizer. You'll be surprised at how few lines of code it takes to accomplish this task.
                    </p>

                    <h3 className="sub-heading">Step 1: Write the Core Logic</h3>
                    <p>
                        Create a new file named <code>organizer.py</code>. This script will use Python's built-in <code>os</code> and <code>shutil</code> modules to interact with your file system.
                    </p>
                    <CodeBlock>{`# Filename: organizer.py
import os
import shutil

# This is the path to the folder you want to organize.
# IMPORTANT: Replace "MessyFolder" with the actual name of your folder.
PATH_TO_FOLDER = "C:/Users/YourUsername/Desktop/MessyFolder" 

# Change the current working directory to the target folder
os.chdir(PATH_TO_FOLDER)

# Get a list of all files in the directory
files = os.listdir()

for filename in files:
    # We only want to process actual files, not directories
    if os.path.isfile(filename):
        # Get the file extension (e.g., ".txt", ".pdf")
        file_extension = os.path.splitext(filename)[1].lower()
        
        # If the extension is empty (i.e., a file with no extension), skip it
        if not file_extension:
            continue
            
        # Create a new directory name (e.g., ".txt" becomes "txt_files")
        folder_name = file_extension[1:] + "_files"
        
        # Create the new directory if it doesn't already exist
        if not os.path.exists(folder_name):
            os.makedirs(folder_name)
        
        # Move the file into the new directory
        shutil.move(filename, folder_name)

print("🎉 Files have been successfully organized!")
`}</CodeBlock>
                </div>
                
                <div className="course-module">
                    <h2 className="module-title">Module 3: Running Your Script</h2>
                    <p className="module-intro">
                        Now that you have the code, it's time to run it and see the magic happen!
                    </p>

                    <h3 className="sub-heading">How to Run</h3>
                    <p>
                        Open your terminal or command prompt, navigate to the folder where you saved <code>organizer.py</code>, and execute the following command:
                    </p>
                    <CodeBlock>{`python organizer.py`}</CodeBlock>
                    <p>
                        After a few moments, you should see a message in your terminal and find that your "MessyFolder" is now neatly organized into new sub-folders.
                    </p>
                </div>
                
                <div className="course-module">
                    <h2 className="module-title">Video Walkthroughs</h2>
                    <p className="module-intro">
                        For a more visual guide, check out these video tutorials on Python automation and file organization.
                    </p>
                    <div className="video-grid">
                        <div className="video-embed">
                            <iframe 
                                width="560" 
                                height="315" 
                                src="https://www.youtube.com/embed/-THkab7E-Mg" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                                title="How to Automate File Organization with Python"
                            ></iframe>
                        </div>
                        <div className="video-embed">
                            <iframe 
                                width="560" 
                                height="315" 
                                src="https://www.youtube.com/embed/9YxCFnL4BgY" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                                title="Build a React Component for YouTube"
                            ></iframe>
                        </div>
                    </div>
                </div>

                <div className="course-footer">
                    <p>This tutorial was created by <strong>Mark</strong>.</p>
                    <p>Follow on Twitter: <a href="https://twitter.com/tensorGL" target="_blank" rel="noopener noreferrer">@tensorGL</a></p>
                </div>
            </div>
        </section>
    );
};

export default AutomationProjectCourse;