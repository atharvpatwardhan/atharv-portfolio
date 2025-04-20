"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Project } from "@/utils/interface";
import { Github } from "@/components/ui/Icons";
import Link from "next/link";
import { motion } from "motion/react";

const ProjectStory = {
  project1: {
    motivation:
      "As a machine learning enthusiast, I wanted to create a tool that would help data scientists and ML engineers evaluate their models more efficiently. The traditional process of model evaluation can be time-consuming and error-prone, which inspired me to build an automated pipeline.",
    challenges: [
      "Integrating multiple AWS services seamlessly",
      "Ensuring reliable execution of Docker containers in Lambda",
      "Designing an efficient data flow between services",
      "Implementing real-time metric updates in the dashboard",
    ],
    implementation:
      "The solution leverages AWS Lambda's serverless architecture to run containerized Python scripts. These scripts evaluate model performance using various metrics like MSE, MAE, and R² Score. The results are stored in DynamoDB for persistence and retrieved by a Streamlit dashboard for visualization.",
    learnings:
      "This project significantly improved my understanding of cloud architecture, containerization, and MLOps practices. I learned how to design scalable systems that can handle multiple model evaluations concurrently while maintaining reliability.",
    impact:
      "The pipeline reduced model evaluation time by 60% and eliminated manual errors in the process. It's now being used by several data science teams in their workflow.",
  },
  project2: {
    motivation:
      "With the rapidly evolving job market, I noticed a gap between available career data and actionable insights. I wanted to create a tool that would help job seekers make informed decisions about their careers using data from reliable sources.",
    challenges: [
      "Processing and cleaning large datasets from the US Bureau of Labor Statistics",
      "Building an accurate salary prediction model",
      "Implementing an effective recommendation system",
      "Creating intuitive visualizations for complex data",
    ],
    implementation:
      "The solution combines machine learning with data visualization. I used Random Forest Regression for salary predictions and implemented a collaborative filtering system using cosine similarity for job recommendations. The interactive dashboard was built using Streamlit and Plotly.",
    learnings:
      "This project enhanced my skills in data processing, machine learning, and data visualization. I learned how to transform raw data into meaningful insights and present them in an accessible way.",
    impact:
      "The platform has helped numerous users make data-driven career decisions, with the salary prediction model achieving 85% accuracy.",
  },
  project3: {
    motivation:
      "Inspired by the advancements in autonomous driving technology, I wanted to explore how deep learning could be applied to vehicle control systems. The goal was to create a model that could learn to drive from human behavior.",
    challenges: [
      "Collecting and preprocessing diverse driving scenarios data",
      "Implementing real-time image processing pipeline",
      "Training CNN model with limited computational resources",
      "Fine-tuning model parameters for optimal performance",
    ],
    implementation:
      "The solution uses a CNN architecture inspired by NVIDIA's research, processing real-time video input from the simulator. The model learns to predict steering angles based on visual input, using techniques like data augmentation and dropout for better generalization.",
    learnings:
      "This project deepened my understanding of computer vision, deep learning architectures, and the challenges of real-time processing systems.",
    impact:
      "Achieved 90% success rate in lane keeping and demonstrated the potential of end-to-end learning for autonomous systems.",
  },
  project4: {
    motivation:
      "As an avid Clash Royale player, I wanted to create a tool that would help players make better strategic decisions by analyzing game data and identifying patterns in successful gameplay.",
    challenges: [
      "Processing and organizing large volumes of game data",
      "Implementing efficient data structures for quick analysis",
      "Creating meaningful visualizations for complex game metrics",
      "Optimizing clustering algorithms for player behavior analysis",
    ],
    implementation:
      "Used Python with Panel library to create an interactive dashboard. Implemented K-means clustering to group similar gameplay patterns and leveraged numpy for efficient data processing. Created custom visualizations to display trends across different game arenas.",
    learnings:
      "Enhanced my skills in data processing, statistical analysis, and creating user-friendly data visualizations.",
    impact:
      "The dashboard has helped players improve their gameplay strategies, leading to better win rates and more informed deck building decisions.",
  },
  project5: {
    motivation:
      "With drowsy driving being a major cause of accidents, I wanted to create a system that could help prevent such incidents by detecting early signs of driver fatigue.",
    challenges: [
      "Real-time face and eye detection in varying lighting conditions",
      "Building an accurate drowsiness classification model",
      "Optimizing system for real-time performance",
      "Handling edge cases and false positives",
    ],
    implementation:
      "Developed using OpenCV for face detection and a custom CNN model for drowsiness classification. The system monitors eye aspect ratio and head position in real-time, triggering alerts when signs of drowsiness are detected. The project integrates a feedback loop for retraining using Apache Kafka, Spark, AWS, and Airflow. Model performance is tracked with MLflow.",
    learnings:
      "Gained extensive experience in computer vision, real-time processing systems, and deploying deep learning models in practical applications. Learned to set up a scalable pipeline that enables automated retraining based on misclassified data.",
    impact:
      "Achieved 94% accuracy in detecting drowsiness, significantly improving road safety through AI-driven monitoring systems. The automated retraining loop ensures the system adapts and improves over time.",
  },
  project6: {
    motivation:
      "I wanted to implement an end-to-end data engineering project solution that automates the entire machine learning workflow, from data ingestion to model deployment. The goal was to apply a comprehensive pipeline to predict wine quality based on its chemical properties, showcasing the integration of various data engineering practices.",
    challenges: [
      "Handling missing values and ensuring data integrity",
      "Designing a scalable pipeline that could easily be extended for other datasets",
      "Choosing the right model for prediction that balances performance and complexity",
      "Building an intuitive user interface for predictions",
    ],
    implementation:
      "The solution processes the wine dataset by first cleaning and transforming the data. ElasticNet regression is used for model training, with model performance tracked via MLflow. The system is deployed as a Flask web application, where users can input wine properties to get predictions on the quality of wine. The pipeline is automated and modular, with clear separation of tasks like data ingestion, validation, and transformation.",
    learnings:
      "This project enhanced my skills in data preprocessing, regression models, and ML pipeline development. I gained experience in integrating machine learning with web applications, as well as managing experiments and tracking model performance with MLflow.",
    impact:
      "The project demonstrates the creation of a fully automated data pipeline, showcasing how end-to-end solutions can be designed and deployed in a real-world scenario. The modular architecture ensures easy future enhancements and adaptations for other datasets or models.",
  },
};

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [story, setStory] = useState<any>(null);

  useEffect(() => {
    const projects = require("@/dummy.json").projects;
    const foundProject = projects.find((p: Project) => p._id === id);
    setProject(foundProject);
    setStory(ProjectStory[id as keyof typeof ProjectStory]);
  }, [id]);

  if (!project || !story) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Link
        href="/#projects"
        className="fixed top-8 left-8 z-50 px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full hover:bg-primary/20 transition-colors flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </Link>
      <div className="max-w-5xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="relative h-[60vh] rounded-2xl overflow-hidden">
            <img
              src={project.image.url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <section className="space-y-8">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl leading-relaxed text-white/80">
                {project.description}
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href={project.githuburl}
                target="_blank"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Github />
                View on GitHub
              </Link>
              {project.liveurl && (
                <Link
                  href={project.liveurl}
                  target="_blank"
                  className="px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  Live Demo →
                </Link>
              )}
            </div>
          </section>

          {/* Project Story */}
          <section className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">The Story</h2>
              <p className="text-lg text-white/80">{story.motivation}</p>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Challenges Faced</h2>
              <ul className="space-y-4">
                {story.challenges.map((challenge: string, index: number) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="text-2xl">•</span>
                    <p className="text-lg text-white/80">{challenge}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Implementation</h2>
              <p className="text-lg text-white/80">{story.implementation}</p>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Key Learnings</h2>
              <p className="text-lg text-white/80">{story.learnings}</p>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Impact</h2>
              <p className="text-lg text-white/80">{story.impact}</p>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
