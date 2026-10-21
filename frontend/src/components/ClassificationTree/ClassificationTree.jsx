
import "./ClassificationTree.css"

function TreeNode({ node }) {
  if (!node) return null

  const children = Array.isArray(node.children)
    ? node.children
    : []

  return (
    <li className="classification-node">
      <div className="classification-box">
        {node.label}
      </div>

      {children.length > 0 && (
        <ul className="classification-children">
          {children.map((child, index) => (
            <TreeNode
              key={`${child.label}-${index}`}
              node={child}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function ClassificationTree({ data }) {
  const tree = data?.tree

  if (!tree || !tree.label) return null

  return (
    <section className="academic-section classification-section">
      {data.title && <h2>{data.title}</h2>}

      <div
        className="classification-chart"
        role="region"
        aria-label={`${tree.label} classification chart`}
        tabIndex={0}
      >
        <ul className="classification-tree">
          <TreeNode node={tree} />
        </ul>
      </div>
    </section>
  )
}

export default ClassificationTree
