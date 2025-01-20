export const getResumeScore = async (formData) => {
    try {
      const response = await fetch('http://localhost:4200/api/get-resume-score-ai', {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching resume score:", error);
    }
  };
  