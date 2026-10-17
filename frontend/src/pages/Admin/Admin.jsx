
import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  marginTop: "8px",
  marginBottom: "16px",
  padding: "12px",
  border: "1px solid #D5DAE1",
  borderRadius: "8px",
  font: "inherit",
};

const buttonStyle = {
  padding: "12px 18px",
  background: "#00D2FF",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 700,
};

const cardStyle = {
  marginTop: "24px",
  padding: "24px",
  border: "1px solid #E1E5EA",
  borderRadius: "12px",
};

const sectionTypes = [
  { value: "understand", label: "Explanation" },
  { value: "realWorld", label: "Real-world example" },
  { value: "howItWorks", label: "How it works" },
  { value: "code", label: "Code example" },
  { value: "complexity", label: "Complexity analysis" },
];

function Admin() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [sections, setSections] = useState([]);

  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [description, setDescription] = useState("");

  const [topicTitle, setTopicTitle] = useState("");
  const [topicSlug, setTopicSlug] = useState("");
  const [topicDescription, setTopicDescription] = useState("");

  const [sectionType, setSectionType] = useState("understand");
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionContent, setSectionContent] = useState(
    '{\n  "paragraphs": [\n    "Write your explanation here."\n  ]\n}'
  );
  const [sectionPosition, setSectionPosition] = useState("1");
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingSubjectId, setEditingSubjectId] = useState(null);
  const [editingTopicId, setEditingTopicId] = useState(null);
  const [topicPublished, setTopicPublished] = useState(false);

  async function request(url, options = {}) {
    const response = await fetch(`${API_URL}${url}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        typeof result.detail === "string"
          ? result.detail
          : "The request failed."
      );
    }

    return result;
  }

  async function loadSubjects() {
    const data = await request("/api/subjects");
    setSubjects(data);

    setSelectedSubject((current) =>
      data.some((subject) => String(subject.id) === current)
        ? current
        : data.length
          ? String(data[0].id)
          : ""
    );
  }

  async function loadTopics(subjectId) {
    if (!subjectId) {
      setTopics([]);
      setSelectedTopic("");
      return;
    }

    const data = await request(`/api/subjects/${subjectId}/topics`);
    setTopics(data);

    setSelectedTopic((current) =>
      data.some((topic) => String(topic.id) === current)
        ? current
        : data.length
          ? String(data[0].id)
          : ""
    );
  }

  async function loadSections(topicId) {
    if (!topicId) {
      setSections([]);
      return;
    }

    const data = await request(`/api/topics/${topicId}/sections`);
    setSections(data);
  }

  useEffect(() => {
    loadSubjects().catch((error) => setMessage(error.message));
  }, []);

  useEffect(() => {
    loadTopics(selectedSubject).catch((error) => {
      setTopics([]);
      setMessage(error.message);
    });
  }, [selectedSubject]);

  useEffect(() => {
    loadSections(selectedTopic).catch((error) => {
      setSections([]);
      setMessage(error.message);
    });
  }, [selectedTopic]);


  function handleEditSubject(subject) {
    setEditingSubjectId(subject.id);
    setName(subject.name);
    setShortName(subject.short_name);
    setDescription(subject.description || "");
    setMessage(`Editing subject: ${subject.name}`);
  }


  function handleEditSection(section) {
   setEditingSectionId(section.id);
   setSectionType(section.section_type);
   setSectionTitle(section.title);
   setSectionPosition(String(section.position));
   setSectionContent(JSON.stringify(section.content, null, 2));
   setMessage(`Editing "${section.title}"`);
  }

  
  function handleCancelEdit() {
   setEditingSectionId(null);
   setSectionType("understand");
   setSectionTitle("");
   setSectionContent(
    '{\n  "paragraphs": [\n    "Write your explanation here."\n  ]\n}'
   );
   setSectionPosition(String(sections.length + 1));
   setConfirmDeleteId(null);
   setMessage("Editing cancelled.");
  }



  async function handleSubjectSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const params = new URLSearchParams({
        name,
        short_name: shortName,
        description,
      });

      const url = editingSubjectId
        ? `/api/subjects/${editingSubjectId}?${params}`
        : `/api/subjects?${params}`;

      await request(url, {
        method: editingSubjectId ? "PUT" : "POST",
      });

      setMessage(
        editingSubjectId
          ? "Subject updated successfully!"
          : "Subject saved successfully!"
      );

      setEditingSubjectId(null);
      setName("");
      setShortName("");
      setDescription("");

      await loadSubjects();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }



  async function handleTopicSubmit(event) {
    event.preventDefault();

    if (!selectedSubject) {
      setMessage("Please select a subject first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await request(
        `/api/subjects/${selectedSubject}/topics?${new URLSearchParams({
          title: topicTitle,
          slug: topicSlug,
          description: topicDescription,
        })}`,
        { method: "POST" }
      );

      setMessage("Topic saved successfully!");
      setTopicTitle("");
      setTopicSlug("");
      setTopicDescription("");
      await loadTopics(selectedSubject);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }


    async function handleSectionSubmit(event) {
    event.preventDefault();

    if (!selectedTopic) {
        setMessage("Please select a topic first.");
        return;
    }

    let content;

    try {
        content = JSON.parse(sectionContent);

        if (
        content === null ||
        Array.isArray(content) ||
        typeof content !== "object"
        ) {
        throw new Error("Content must be a JSON object.");
        }
    } catch (error) {
        setMessage(`Invalid content JSON: ${error.message}`);
        return;
    }

    setLoading(true);
    setMessage("");

    try {
        const url = editingSectionId
        ? `/api/topics/${selectedTopic}/sections/${editingSectionId}`
        : `/api/topics/${selectedTopic}/sections`;

        const params = new URLSearchParams({
        section_type: sectionType,
        title: sectionTitle,
        position: sectionPosition,
        });

        await request(`${url}?${params.toString()}`, {
        method: editingSectionId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
        });

        setMessage(
        editingSectionId
            ? "Lesson section updated successfully!"
            : "Lesson section saved successfully!"
        );

        setEditingSectionId(null);
        setSectionTitle("");
        setSectionContent(
        '{\n  "paragraphs": [\n    "Write your explanation here."\n  ]\n}'
        );
        setSectionPosition(String(sections.length + 1));

        await loadSections(selectedTopic);
    } catch (error) {
        setMessage(error.message);
    } finally {
        setLoading(false);
    }
    }


  function handleTitleChange(value) {
    setTopicTitle(value);
    setTopicSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    );
  }

  return (
    <main style={{ maxWidth: "900px", margin: "40px auto", padding: "24px" }}>
      <p style={{ color: "#00AACC", fontWeight: 700 }}>VEDA ADMIN</p>
      <h1>Content Management</h1>
      <p>Manage subjects, topics, and lesson content in one place.</p>

      {message && (
        <p role="status" aria-live="polite">
          {message}
        </p>
      )}

      <section style={cardStyle}>
        <h2>Add a subject</h2>
        <form onSubmit={handleSubjectSubmit}>
          <label>
            Subject name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Operating Systems"
              style={inputStyle}
            />
          </label>
          <label>
            Short name
            <input
              required
              value={shortName}
              onChange={(event) =>
                setShortName(event.target.value.toUpperCase())
              }
              placeholder="e.g. OS"
              style={inputStyle}
            />
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              style={inputStyle}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : editingSubjectId
                ? "Update subject"
                : "Save subject"}
          </button>

          {editingSubjectId && (
            <button
              type="button"
              onClick={() => {
                setEditingSubjectId(null);
                setName("");
                setShortName("");
                setDescription("");
                setMessage("Subject editing cancelled.");
              }}
              disabled={loading}
              style={{
                ...buttonStyle,
                marginLeft: "8px",
                background: "#E5E7EB",
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </section>

      <section style={cardStyle}>
        <h2>Saved subjects ({subjects.length})</h2>
        {subjects.map((subject) => (
          <article key={subject.id} style={{ padding: "12px 0" }}>
            <strong>{subject.name}</strong> · {subject.short_name}
            <p>{subject.description}</p>
              <button
                type="button"
                onClick={() => handleEditSubject(subject)}
                style={buttonStyle}
              >
                Edit subject
              </button>
          </article>
        ))}
      </section>

      <section style={cardStyle}>
        <h2>Add a topic</h2>
        <form onSubmit={handleTopicSubmit}>
          <label>
            Subject
            <select
              required
              value={selectedSubject}
              onChange={(event) => setSelectedSubject(event.target.value)}
              style={inputStyle}
            >
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Topic title
            <input
              required
              value={topicTitle}
              onChange={(event) => handleTitleChange(event.target.value)}
              placeholder="e.g. Binary Search"
              style={inputStyle}
            />
          </label>
          <label>
            URL slug
            <input
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              value={topicSlug}
              onChange={(event) => setTopicSlug(event.target.value)}
              placeholder="binary-search"
              style={inputStyle}
            />
          </label>
          <label>
            Description
            <textarea
              value={topicDescription}
              onChange={(event) => setTopicDescription(event.target.value)}
              rows={3}
              style={inputStyle}
            />
          </label>
          <button
            type="submit"
            disabled={loading || !selectedSubject}
            style={buttonStyle}
          >
            Save topic
          </button>
        </form>

        <h3>Topics ({topics.length})</h3>
        {topics.map((topic) => (
          <article key={topic.id} style={{ padding: "12px 0" }}>
            <strong>{topic.title}</strong>
            <p>{topic.description}</p>
            <small>{topic.slug} · {topic.published ? "Published" : "Draft"}</small>
          </article>
        ))}
      </section>

      <section style={cardStyle}>
        <h2>Lesson content editor</h2>
        <p>Add individual sections to a topic. Content is stored as JSON.</p>

        <form onSubmit={handleSectionSubmit}>
          <label>
            Subject
            <select
              value={selectedSubject}
              onChange={(event) => setSelectedSubject(event.target.value)}
              style={inputStyle}
            >
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Topic
            <select
              required
              value={selectedTopic}
              onChange={(event) => setSelectedTopic(event.target.value)}
              style={inputStyle}
            >
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Learning section
            <select
              value={sectionType}
              onChange={(event) => setSectionType(event.target.value)}
              style={inputStyle}
            >
              {sectionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Section title
            <input
              required
              value={sectionTitle}
              onChange={(event) => setSectionTitle(event.target.value)}
              placeholder="e.g. Understanding Arrays"
              style={inputStyle}
            />
          </label>

          <label>
            Display order
            <input
              type="number"
              min="1"
              required
              value={sectionPosition}
              onChange={(event) => setSectionPosition(event.target.value)}
              style={inputStyle}
            />
          </label>

          <label>
            Section content (JSON)
            <textarea
              required
              rows={10}
              value={sectionContent}
              onChange={(event) => setSectionContent(event.target.value)}
              style={{
                ...inputStyle,
                fontFamily: "monospace",
                whiteSpace: "pre",
              }}
            />
          </label>

          <button
            type="submit"
            disabled={loading || !selectedTopic}
            style={buttonStyle}
          >
            
            {loading
            ? "Saving..."
            : editingSectionId
                ? "Update section"
                : "Save lesson section"}

          </button>
        
            {editingSectionId && (
            <button
                type="button"
                onClick={handleCancelEdit}
                disabled={loading}
                style={{
                ...buttonStyle,
                background: "#E5E7EB",
                color: "#121316",
                marginLeft: "8px",
                }}
            >
                Cancel editing
            </button>
            )}

        </form>


        <h3>Saved sections ({sections.length})</h3>

        {sections.map((section) => (
        <article
            key={section.id}
            style={{
            padding: "12px",
            marginTop: "10px",
            border: "1px solid #E1E5EA",
            borderRadius: "8px",
            }}
        >
            <strong>{section.title}</strong>

            <p>
            {sectionTypes.find(
                (type) => type.value === section.section_type
            )?.label || section.section_type}
            {" · "}Order {section.position}
            </p>

            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <button
                type="button"
                onClick={() => handleEditSection(section)}
                style={buttonStyle}
            >
                Edit
            </button>

            <button
                type="button"
                onClick={() => setConfirmDeleteId(section.id)}
                style={{
                ...buttonStyle,
                background: "#FDE8E7",
                color: "#B42318",
                }}
            >
                Delete
            </button>
            </div>

            {confirmDeleteId === section.id && (
            <div style={{ marginTop: "12px" }}>
                <p>Delete "{section.title}" permanently?</p>

                <button
                type="button"
                onClick={async () => {
                    try {
                    await request(
                        `/api/topics/${selectedTopic}/sections/${section.id}`,
                        { method: "DELETE" }
                    );

                    setMessage("Section deleted successfully!");
                    setConfirmDeleteId(null);

                    if (editingSectionId === section.id) {
                        setEditingSectionId(null);
                        setSectionTitle("");
                        setSectionContent(
                        '{\n  "paragraphs": [\n    "Write your explanation here."\n  ]\n}'
                        );
                    }

                    await loadSections(selectedTopic);
                    } catch (error) {
                    setMessage(error.message);
                    }
                }}
                style={{
                    ...buttonStyle,
                    background: "#DC2626",
                    color: "#FFFFFF",
                }}
                >
                Confirm delete
                </button>

                <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                style={{ ...buttonStyle, marginLeft: "8px" }}
                >
                Cancel
                </button>
            </div>
            )}
        </article>
        ))}
      </section>
    </main>
  );
}

export default Admin;
