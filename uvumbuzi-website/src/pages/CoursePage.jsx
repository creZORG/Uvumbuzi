// src/pages/CoursePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import './CoursePage.css';

// Here is the detailed content for all courses
const coursesContent = {
    'automation': {
        title: 'Automation with Python',
        icon: 'fas fa-robot',
        description: `This course introduces you to the power of automation using Python. It covers the fundamentals of automating repetitive tasks, a key skill for improving efficiency and reducing human error in any tech role.`,
        modules: [
            {
                title: 'Introduction and Environment Setup',
                intro: 'This module will get you started with Python and introduce key automation concepts.',
                subsections: [
                    { heading: 'What You\'ll Need', listItems: ['A computer.', 'A code editor like VS Code.', 'Python 3 installed.'] },
                    { 
                        heading: 'Your First Script: "Hello World"', 
                        text: 'Create a file named hello.py and add the following:', 
                        code: `# Save this file as hello.py\nprint("Hello, Automation World!")` 
                    },
                ],
            },
            {
                title: 'Automating File Operations',
                intro: 'Learn to write scripts that manage files on your computer using Python\'s `os` and `shutil` modules.',
                subsections: [
                    { 
                        heading: 'Example: Organizing a Folder', 
                        text: 'This script creates new folders for each file type and moves the files into them.', 
                        code: `# Save as file_organizer.py\nimport os, shutil\ndirectory = "C:/path/to/folder"\nos.chdir(directory)\nfor file in os.listdir():\n    if os.path.isfile(file):\n        ext = os.path.splitext(file)[1]\n        if not os.path.exists(ext):\n            os.makedirs(ext)\n        shutil.move(file, ext)\nprint("Done!")` 
                    },
                ],
            },
            {
                title: 'Web Scraping Basics',
                intro: 'Web scraping is the process of extracting data from websites. We will use the `requests` and `BeautifulSoup` libraries for this.',
                subsections: [
                    { 
                        heading: 'Installation', 
                        text: 'Install the necessary libraries using pip:', 
                        code: 'pip install requests beautifulsoup4' 
                    },
                    { 
                        heading: 'Example: Scraping a Website\'s Title', 
                        text: 'This simple script will visit a website and print its main title.', 
                        code: `# Save as scraper.py\nimport requests\nfrom bs4 import BeautifulSoup\nurl = "http://example.com"\nresponse = requests.get(url)\nsoup = BeautifulSoup(response.content, 'html.parser')\ntitle = soup.find('title').get_text()\nprint(f"Title: {title}")` 
                    },
                ],
            },
        ],
        author: 'Mark',
        twitter: 'tensorGL'
    },
    // Add other courses here (e.g., 'web-development', 'ethical-hacking')
};

const CoursePage = () => {
    const { courseId } = useParams();
    const course = coursesContent[courseId];
    const { currentUser } = useAuth();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (currentUser && course) {
            const userProgressRef = doc(db, "users", currentUser.uid);
            
            const updateProgress = async () => {
                await setDoc(userProgressRef, {
                    lastViewedCourse: courseId,
                    lastViewedTitle: course.title,
                    courses: {
                        [courseId]: {
                            progress: progress,
                            lastViewed: new Date()
                        }
                    }
                }, { merge: true });
            };
            
            updateProgress();
        }
    }, [currentUser, courseId, course, progress]);

    if (!course) {
        return (
            <div className="course-page-not-found">
                <h1>Course Not Found</h1>
                <p>The course you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <section className="course-page">
            <div className="container">
                <div className="course-header">
                    <i className={`${course.icon} course-header-icon`}></i>
                    <div className="course-header-content">
                        <h1 className="course-title">{course.title}</h1>
                        <p className="course-description">{course.description}</p>
                    </div>
                </div>
                
                {course.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="course-module">
                        <h2 className="module-title">Module {moduleIndex + 1}: {module.title}</h2>
                        <p className="module-intro">{module.intro}</p>
                        
                        {module.subsections.map((sub, subIndex) => (
                            <div key={subIndex} className="course-subsection">
                                {sub.heading && <h3 className="sub-heading">{sub.heading}</h3>}
                                {sub.listItems && (
                                    <ul className="module-list">
                                        {sub.listItems.map((item, itemIndex) => (
                                            <li key={itemIndex}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                                {sub.text && <p>{sub.text}</p>}
                                {sub.code && (
                                    <div className="code-block">
                                        <pre><code>{sub.code}</code></pre>
                                    </div>
                                )}
                                {sub.runInstructions && <p>{sub.runInstructions}</p>}
                                {sub.runCommand && (
                                    <div className="code-block">
                                        <pre><code>{sub.runCommand}</code></pre>
                                    </div>
                                )}
                                {sub.output && <p className="output-text">{sub.output}</p>}
                            </div>
                        ))}
                    </div>
                ))}
                
                <div className="course-footer-credits">
                    <p>This tutorial was created by <strong>{course.author}</strong>.</p>
                    <p>Follow on Twitter: <a href={`https://twitter.com/${course.twitter}`} target="_blank" rel="noopener noreferrer">@{course.twitter}</a></p>
                </div>
            </div>
        </section>
    );
};

export default CoursePage;