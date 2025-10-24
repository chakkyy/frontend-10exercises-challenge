import ReactMarkdown from 'react-markdown'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash'
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css'
import scss from 'react-syntax-highlighter/dist/esm/languages/hljs/scss'
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml'
import vs2015 from 'react-syntax-highlighter/dist/esm/styles/hljs/vs2015'

// Register only the languages we need to reduce bundle size
// TODO: Use another syntax highlighter as this is reducing the navigation performance
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('ts', typescript)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('jsx', javascript)
SyntaxHighlighter.registerLanguage('tsx', typescript)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('scss', scss)
SyntaxHighlighter.registerLanguage('html', xml)
SyntaxHighlighter.registerLanguage('xml', xml)

interface MarkdownRendererProps {
  content: string
  className?: string
}

export const MarkdownRenderer = ({ content, className = '' }: MarkdownRendererProps) => {
  return (
    <div className={`prose prose-zinc dark:prose-invert max-w-none ${className}`}>
      <div className="space-y-6 [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-zinc-900 [&>h1]:dark:text-zinc-100 [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-zinc-900 [&>h2]:dark:text-zinc-100 [&>h2]:mb-3 [&>h2]:mt-8 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:text-zinc-900 [&>h3]:dark:text-zinc-100 [&>h3]:mb-2 [&>h3]:mt-6 [&>h4]:text-base [&>h4]:font-medium [&>h4]:text-zinc-900 [&>h4]:dark:text-zinc-100 [&>h4]:mb-2 [&>h4]:mt-4 [&>p]:text-zinc-700 [&>p]:dark:text-zinc-300 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:text-zinc-700 [&>ul]:dark:text-zinc-300 [&>ul]:mb-4 [&>ul]:space-y-2 [&>ol]:text-zinc-700 [&>ol]:dark:text-zinc-300 [&>ol]:mb-4 [&>ol]:space-y-2 [&>li]:text-zinc-700 [&>li]:dark:text-zinc-300 [&>blockquote]:border-l-4 [&>blockquote]:border-zinc-300 [&>blockquote]:dark:border-zinc-600 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-zinc-600 [&>blockquote]:dark:text-zinc-400 [&>strong]:text-zinc-900 [&>strong]:dark:text-zinc-100 [&>strong]:font-semibold">
        <ReactMarkdown
          components={{
            // we use any because library doesn't have types defined for this component
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            code({ inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <div className="my-6 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                  <SyntaxHighlighter
                    style={vs2015}
                    language={match[1]}
                    PreTag="div"
                    className="m-0! bg-zinc-900! dark:bg-zinc-950!"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-mono border border-zinc-200 dark:border-zinc-700"
                  {...props}
                >
                  {children}
                </code>
              )
            },
            h1({ children, ...props }) {
              return (
                <h1
                  className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800"
                  {...props}
                >
                  {children}
                </h1>
              )
            },
            h2({ children, ...props }) {
              return (
                <h2
                  className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 mt-8"
                  {...props}
                >
                  {children}
                </h2>
              )
            },
            h3({ children, ...props }) {
              return (
                <h3
                  className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6"
                  {...props}
                >
                  {children}
                </h3>
              )
            },
            p({ children, ...props }) {
              return (
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4" {...props}>
                  {children}
                </p>
              )
            },
            ul({ children, ...props }) {
              return (
                <ul
                  className="text-zinc-700 dark:text-zinc-300 mb-4 space-y-2 list-disc list-inside"
                  {...props}
                >
                  {children}
                </ul>
              )
            },
            ol({ children, ...props }) {
              return (
                <ol
                  className="text-zinc-700 dark:text-zinc-300 mb-4 space-y-2 list-decimal list-inside"
                  {...props}
                >
                  {children}
                </ol>
              )
            },
            li({ children, ...props }) {
              return (
                <li className="text-zinc-700 dark:text-zinc-300" {...props}>
                  {children}
                </li>
              )
            },
            blockquote({ children, ...props }) {
              return (
                <blockquote
                  className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4"
                  {...props}
                >
                  {children}
                </blockquote>
              )
            },
            strong({ children, ...props }) {
              return (
                <strong className="text-zinc-900 dark:text-zinc-100 font-semibold" {...props}>
                  {children}
                </strong>
              )
            },
            a({ children, href, ...props }) {
              return (
                <a
                  href={href}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-blue-600/30 hover:decoration-blue-600/60 dark:decoration-blue-400/30 dark:hover:decoration-blue-400/60 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              )
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
