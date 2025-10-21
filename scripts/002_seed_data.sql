-- Seed data for Tanush Shah's portfolio

-- Insert skills
INSERT INTO skills (name, category, proficiency_level, years_experience) VALUES
-- Programming Languages
('C++', 'Software', 5, 7.0),
('Python', 'Software', 5, 6.0),
('JavaScript', 'Software', 5, 4.0),
('TypeScript', 'Software', 5, 3.0),
('Java', 'Software', 4, 3.0),
('SQL', 'Software', 4, 2.0),

-- Tools & Frameworks
('React', 'Libraries', 5, 3.0),
('Next.js', 'Libraries', 5, 2.0),
('Node.js', 'Libraries', 5, 3.0),
('PyTorch', 'Libraries', 4, 2.0),
('TensorFlow', 'Libraries', 4, 2.0),
('YOLOv5', 'Libraries', 4, 2.0),
('Git', 'Tools', 5, 5.0),
('Linux', 'Software', 4, 4.0),

-- Hardware & CAD
('Arduino', 'Hardware', 5, 7.0),
('ESP32', 'Hardware', 5, 4.0),
('STM32', 'Hardware', 4, 3.0),
('Fusion 360', 'Tools', 5, 6.0),
('KiCad', 'Tools', 4, 3.0),
('3D Printing', 'Hardware', 5, 6.0)
ON CONFLICT (name) DO NOTHING;

-- Insert projects
INSERT INTO projects (title, description, technologies, github_url, category, featured, image_url) VALUES
(
    'VEX Robotics World Championship Robot',
    'Led 6-person team to Finalist position at VEX Robotics World Championship, ranking top 2 of 20,000 teams worldwide. Programmed drive, autonomous, PID, and odometry systems in C++. Designed complete robot CAD in Fusion 360 and Onshape.',
    ARRAY['C++', 'VEXCode Pro', 'PROS', 'Fusion 360', 'Onshape', 'PID Control', 'Odometry'],
    'http://bit.ly/46xUgox',
    'Robotics',
    true,
    '/advanced-robotics-competition-robot-with-sensors.jpg'
),
(
    'Large-Format Gantry 3D Printer',
    'Designed, built, and coded modular large-format gantry 3D printer using Onshape. Implemented multi-axis motion control and G-code execution with Duet 3D Controller and RepRap Firmware for portable 3D printing. Presented at symposium with 2000+ attendees.',
    ARRAY['Onshape', 'RepRap Firmware', 'G-code', 'Motion Control', 'Duet 3D'],
    'https://bit.ly/48rf9Ej',
    'Hardware',
    true,
    '/large-format-gantry-3d-printer-industrial.jpg'
),
(
    'Mobile 4WD 3D Printing Robot',
    'Designed, built, and coded mobile 4WD 3D printing robot using Arduino. Fabricated custom PCB shield using KiCad and implemented motion control algorithms and path planning for stepper motors in C++.',
    ARRAY['Arduino', 'C++', 'KiCad', 'PCB Design', 'Stepper Motors', 'Path Planning'],
    'https://bit.ly/48rf9Ej',
    'Robotics',
    true,
    '/mobile-robot-with-3d-printer-autonomous.jpg'
),
(
    'VEX AI Computer Vision System',
    'Developed position mapping and object detection code using YOLOv5 deep learning computer vision model. Engineered serial communication between NVIDIA Jetson Nano (Linux) and V5 Brain for autonomous navigation. Optimized system performance 5x through TensorRT GPU acceleration.',
    ARRAY['Python', 'YOLOv5', 'TensorRT', 'NVIDIA Jetson Nano', 'Linux', 'Computer Vision', 'Serial Communication'],
    'https://bit.ly/3KyGHh4',
    'AI/ML',
    true,
    '/computer-vision-object-detection-ai-robot.jpg'
),
(
    'Financial Market Sentiment Analysis',
    'Built NLP models (LSTM, BERT, Bag of Words) using Python to analyze financial news and predict market trends using sentiment analysis. Achieved 85% classification accuracy in identifying market trends using Logistic Regression, K-Nearest Neighbor, and Random Forest algorithms.',
    ARRAY['Python', 'PyTorch', 'TensorFlow', 'LSTM', 'BERT', 'NLP', 'scikit-learn', 'Pandas'],
    NULL,
    'AI/ML',
    true,
    '/financial-ai-sentiment-analysis-dashboard.jpg'
),
(
    'Full-Stack Portfolio Website',
    'Built comprehensive portfolio website showcasing full-stack development skills. Features React frontend with Next.js, TypeScript, Three.js for 3D visualization, PostgreSQL and MongoDB databases, REST API endpoints, real-time WebSocket communication, and CI/CD pipeline.',
    ARRAY['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Three.js', 'REST API', 'WebSockets', 'Tailwind CSS'],
    NULL,
    'Web Development',
    true,
    '/modern-ecommerce-dashboard.jpg'
)
ON CONFLICT DO NOTHING;

-- Insert experience
INSERT INTO experience (title, company, location, start_date, end_date, is_current, description, achievements, technologies) VALUES
(
    'VEX Robotics Team Captain & Instructor',
    'VEX Robotics',
    'Summit, NJ',
    '2017-08-01',
    '2025-06-01',
    false,
    'Captain of 6-person team, Lead Builder/Programmer',
    ARRAY[
        'Led team to Finalist position at VEX Robotics World Championship, ranking top 2 of 20,000 teams worldwide',
        'Worked 20+ hrs/week on code/build/strategy and engineering notebook with detailed CAD/build/code documentation',
        'Won 5x state-level awards: Excellence Award 2x, Innovate Award 2x, Amaze Award 1x',
        'Programmed drive, autonomous, PID, and odometry systems in VEXCode Pro/PROS (C++ based)',
        'Designed robots using Fusion 360, Onshape, and SolidWorks'
    ],
    ARRAY['C++', 'VEXCode Pro', 'PROS', 'Fusion 360', 'Onshape', 'SolidWorks', 'PID Control']
),
(
    'Electrical Engineering Research Intern',
    'Hofstra University',
    'Hempstead, NY',
    '2024-05-01',
    '2025-05-01',
    false,
    'Research intern focusing on robotics and 3D printing systems',
    ARRAY[
        'Designed, built & coded modular large-format gantry 3D printer in Onshape',
        'Implemented multi-axis motion control & G-code execution with Duet 3D Controller',
        'Designed, built, & coded mobile 4WD 3D Printing Robot using Arduino',
        'Fabricated custom PCB shield using KiCad',
        'Presented research and live demo at symposium (2000+ attendees)'
    ],
    ARRAY['Onshape', 'Arduino', 'C++', 'KiCad', 'RepRap Firmware', 'Motion Control']
),
(
    'Millburn VEX AI Code Captain',
    'VEX Robotics AI',
    'Millburn, NJ',
    '2021-06-01',
    '2023-06-01',
    false,
    'Only AI team directly invited to VEX World Championship for Special Showcase',
    ARRAY[
        'Developed position mapping and object detection code using YOLOv5 deep learning computer vision model',
        'Engineered serial communication between NVIDIA Jetson Nano (Linux) & V5 Brain for autonomous navigation',
        'Optimized system performance 5x through TensorRT GPU acceleration'
    ],
    ARRAY['Python', 'YOLOv5', 'TensorRT', 'NVIDIA Jetson Nano', 'Linux', 'Computer Vision']
),
(
    'Inspirit AI Scholar',
    'Inspirit AI',
    'Remote',
    '2023-06-01',
    '2023-08-01',
    false,
    'Machine Learning Research',
    ARRAY[
        'Built NLP models (LSTM, BERT, Bag of Words) using Python to analyze financial news',
        'Achieved 85% classification accuracy in identifying market trends',
        'Implemented Logistic Regression, K-Nearest Neighbor, and Random Forest algorithms'
    ],
    ARRAY['Python', 'PyTorch', 'TensorFlow', 'Keras', 'Pandas', 'scikit-learn', 'NumPy', 'Matplotlib']
)
ON CONFLICT DO NOTHING;
