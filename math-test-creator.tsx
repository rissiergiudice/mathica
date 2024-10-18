'use client'

import { useState, useEffect, KeyboardEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ClipboardCopyIcon, XIcon } from 'lucide-react'

type Language = 'en' | 'pt' | 'es'

const translations = {
  en: {
    title: "Math Test Creator",
    description: "Generate custom math tests tailored to your needs using our AI-powered system.",
    emailPlaceholder: "Enter your email",
    subscribe: "Subscribe",
    subscribeText: "Sign up to get notified when we launch new features.",
    createTest: "Create Your Math Test",
    customizeTest: "Customize your test parameters below.",
    gradeLevel: "Grade Level",
    topics: "Topics",
    addTopic: "Add",
    enterTopic: "Enter a topic and press Enter",
    numQuestions: "Number of Questions",
    answerType: "Answer Type",
    moreOpenEnded: "More open-ended",
    moreMultipleChoice: "More multiple choice",
    difficulty: "Difficulty",
    easier: "Easier",
    harder: "Harder",
    generateTest: "Generate Test",
    generating: "Generating...",
    generatedTest: "Generated Math Test",
    copyTest: "Copy the test",
    copyInstructions: "Copy and paste the test to your favorite text editor (Microsoft Word, Google Docs, WPS Office)",
    selectLanguage: "Select Language",
  },
  pt: {
    title: "Criador de Teste de Matemática",
    description: "Gere testes de matemática personalizados de acordo com suas necessidades usando nosso sistema alimentado por IA.",
    emailPlaceholder: "Digite seu e-mail",
    subscribe: "Inscrever-se",
    subscribeText: "Cadastre-se para ser notificado quando lançarmos novos recursos.",
    createTest: "Crie Seu Teste de Matemática",
    customizeTest: "Personalize os parâmetros do seu teste abaixo.",
    gradeLevel: "Série Escolar",
    topics: "Tópicos",
    addTopic: "Adicionar",
    enterTopic: "Digite um tópico e pressione Enter",
    numQuestions: "Número de Questões",
    answerType: "Tipo de Resposta",
    moreOpenEnded: "Mais dissertativas",
    moreMultipleChoice: "Mais múltipla escolha",
    difficulty: "Dificuldade",
    easier: "Mais fácil",
    harder: "Mais difícil",
    generateTest: "Gerar Teste",
    generating: "Gerando...",
    generatedTest: "Teste de Matemática Gerado",
    copyTest: "Copiar o teste",
    copyInstructions: "Copie e cole o teste no seu editor de texto favorito (Microsoft Word, Google Docs, WPS Office)",
    selectLanguage: "Selecionar Idioma",
  },
  es: {
    title: "Creador de Pruebas de Matemáticas",
    description: "Genera pruebas de matemáticas personalizadas adaptadas a tus necesidades utilizando nuestro sistema impulsado por IA.",
    emailPlaceholder: "Introduce tu correo electrónico",
    subscribe: "Suscribirse",
    subscribeText: "Regístrate para recibir notificaciones cuando lancemos nuevas funciones.",
    createTest: "Crea Tu Prueba de Matemáticas",
    customizeTest: "Personaliza los parámetros de tu prueba a continuación.",
    gradeLevel: "Nivel Educativo",
    topics: "Temas",
    addTopic: "Añadir",
    enterTopic: "Introduce un tema y presiona Enter",
    numQuestions: "Número de Preguntas",
    answerType: "Tipo de Respuesta",
    moreOpenEnded: "Más abiertas",
    moreMultipleChoice: "Más opción múltiple",
    difficulty: "Dificultad",
    easier: "Más fácil",
    harder: "Más difícil",
    generateTest: "Generar Prueba",
    generating: "Generando...",
    generatedTest: "Prueba de Matemáticas Generada",
    copyTest: "Copiar la prueba",
    copyInstructions: "Copia y pega la prueba en tu editor de texto favorito (Microsoft Word, Google Docs, WPS Office)",
    selectLanguage: "Seleccionar Idioma",
  },
}

const gradeLevels = {
  en: [
    { value: "1", label: "1st Grade (Elementary School)" },
    { value: "2", label: "2nd Grade (Elementary School)" },
    { value: "3", label: "3rd Grade (Elementary School)" },
    { value: "4", label: "4th Grade (Elementary School)" },
    { value: "5", label: "5th Grade (Elementary School)" },
    { value: "6", label: "6th Grade (Middle School)" },
    { value: "7", label: "7th Grade (Middle School)" },
    { value: "8", label: "8th Grade (Middle School)" },
    { value: "9", label: "9th Grade (High School - Freshman)" },
    { value: "10", label: "10th Grade (High School - Sophomore)" },
    { value: "11", label: "11th Grade (High School - Junior)" },
    { value: "12", label: "12th Grade (High School - Senior)" },
  ],
  pt: [
    { value: "1", label: "1º Ano (Ensino Fundamental I)" },
    { value: "2", label: "2º Ano (Ensino Fundamental I)" },
    { value: "3", label: "3º Ano (Ensino Fundamental I)" },
    { value: "4", label: "4º Ano (Ensino Fundamental I)" },
    { value: "5", label: "5º Ano (Ensino Fundamental I)" },
    { value: "6", label: "6º Ano (Ensino Fundamental II)" },
    { value: "7", label: "7º Ano (Ensino Fundamental II)" },
    { value: "8", label: "8º Ano (Ensino Fundamental II)" },
    { value: "9", label: "9º Ano (Ensino Fundamental II)" },
    { value: "10", label: "1º Ano (Ensino Médio)" },
    { value: "11", label: "2º Ano (Ensino Médio)" },
    { value: "12", label: "3º Ano (Ensino Médio)" },
  ],
  es: [
    { value: "1", label: "1º de Primaria" },
    { value: "2", label: "2º de Primaria" },
    { value: "3", label: "3º de Primaria" },
    { value: "4", label: "4º de Primaria" },
    { value: "5", label: "5º de Primaria" },
    { value: "6", label: "6º de Primaria" },
    { value: "7", label: "1º de ESO" },
    { value: "8", label: "2º de ESO" },
    { value: "9", label: "3º de ESO" },
    { value: "10", label: "4º de ESO" },
    { value: "11", label: "1º de Bachillerato" },
    { value: "12", label: "2º de Bachillerato" },
  ],
}

export default function MathTestCreator() {
  const [language, setLanguage] = useState<Language>('en')
  const [email, setEmail] = useState('')
  const [gradeLevel, setGradeLevel] = useState('')
  const [numQuestions, setNumQuestions] = useState(9)
  const [topics, setTopics] = useState<string[]>([])
  const [currentTopic, setCurrentTopic] = useState('')
  const [answerType, setAnswerType] = useState(3)
  const [difficultyBalance, setDifficultyBalance] = useState(3)
  const [generatedTest, setGeneratedTest] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const t = translations[language]

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setLoadingProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer)
            return 100
          }
          return Math.min(oldProgress + 33.33, 100)
        })
      }, 1000)

      return () => {
        clearInterval(timer)
      }
    }
  }, [isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoadingProgress(0)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate generated test
      const simulatedTest = `
        Math Test for Grade ${gradeLevel}
        
        Topics: ${topics.join(', ')}
        
        1. What is 2 + 2?
        2. Solve for x: 3x + 5 = 14
        3. What is the area of a rectangle with length 6 and width 4?
        ${numQuestions > 3 ? `4. If a triangle has a base of 8 units and a height of 6 units, what is its area?
        5. What is the square root of 64?` : ''}
        ${numQuestions > 5 ? `6. Simplify the expression: 2(x + 3) - 4x
        7. What is the value of π (pi) to two decimal places?
        8. If you have 24 cookies and want to share them equally among 6 friends, how many cookies will each friend get?
        9. What is the perimeter of a square with sides of length 5 units?` : ''}
        
        (This is a simulated test. In the actual implementation, this would be generated by the ChatGPT API based on the selected parameters.)
      `
      
      setGeneratedTest(simulatedTest)
    } catch (error) {
      console.error('Error generating test:', error)
      setGeneratedTest('An error occurred while generating the test. Please try again.')
    } finally {
      setIsLoading(false)
      setLoadingProgress(0)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTest)
      .then(() => {
        alert('Test copied to clipboard!')
      })
      .catch(err => {
        console.error('Failed to copy text: ', err)
      })
  }

  const addTopic = () => {
    if (currentTopic && !topics.includes(currentTopic)) {
      setTopics([...topics, currentTopic])
      setCurrentTopic('')
    }
  }

  const removeTopic = (topicToRemove: string) => {
    setTopics(topics.filter(topic => topic !== topicToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTopic()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="py-4 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="flex justify-end items-center">
            <div className="w-48">
              <Label htmlFor="language-select" className="sr-only">
                {t.selectLanguage}
              </Label>
              <Select onValueChange={(value: Language) => setLanguage(value)} value={language}>
                <SelectTrigger id="language-select">
                  <SelectValue placeholder={t.selectLanguage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English (US)</SelectItem>
                  <SelectItem value="pt">Português (BR)</SelectItem>
                  <SelectItem value="es">Español (ES)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              {t.title}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              {t.description}
            </p>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="max-w-lg flex-1"
                />
                <Button type="submit">{t.subscribe}</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                {t.subscribeText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-20 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t.createTest}
              </h2>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                {t.customizeTest}
              </p>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <Label htmlFor="grade-level">{t.gradeLevel}</Label>
                  <Select onValueChange={setGradeLevel} required>
                    <SelectTrigger id="grade-level">
                      <SelectValue placeholder={t.gradeLevel} />
                    </SelectTrigger>
                    <SelectContent>
                
                      {gradeLevels[language].map((grade) => (
                        <SelectItem key={grade.value} value={grade.value}>
                          {grade.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="topics">{t.topics}</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {topics.map((topic, index) => (
                      <div key={index} className="flex items-center bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm">
                        {topic}
                        <button
                          type="button"
                          onClick={() => removeTopic(topic)}
                          className="ml-2 focus:outline-none"
                          aria-label={`Remove ${topic}`}
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      id="topics"
                      value={currentTopic}
                      onChange={(e) => setCurrentTopic(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t.enterTopic}
                      className="flex-1"
                    />
                    <Button type="button" onClick={addTopic}>{t.addTopic}</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="num-questions">{t.numQuestions}: {numQuestions}</Label>
                  <Slider
                    id="num-questions"
                    min={3}
                    max={15}
                    step={1}
                    value={[numQuestions]}
                    onValueChange={(value) => setNumQuestions(value[0])}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>3</span>
                    <span>15</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="answer-type">
                    {t.answerType}: {answerType === 1 ? t.moreOpenEnded : answerType === 5 ? t.moreMultipleChoice : 'Mixed'}
                  </Label>
                  <Slider
                    id="answer-type"
                    min={1}
                    max={5}
                    step={1}
                    value={[answerType]}
                    onValueChange={(value) => setAnswerType(value[0])}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{t.moreOpenEnded}</span>
                    <span>{t.moreMultipleChoice}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="difficulty-balance">
                    {t.difficulty}: {difficultyBalance === 1 ? t.easier : difficultyBalance === 5 ? t.harder : 'Balanced'}
                  </Label>
                  <Slider
                    id="difficulty-balance"
                    min={1}
                    max={5}
                    step={1}
                    value={[difficultyBalance]}
                    onValueChange={(value) => setDifficultyBalance(value[0])}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{t.easier}</span>
                    <span>{t.harder}</span>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? `${t.generating} ${loadingProgress.toFixed(0)}%` : t.generateTest}
                </Button>
              </form>
            </div>
            <div className="space-y-8 flex flex-col">
              <h2 className="text-2xl font-bold">{t.generatedTest}</h2>
              <div className="relative flex-grow flex flex-col">
                <Textarea
                  value={generatedTest}
                  readOnly
                  className="flex-grow resize-none"
                  placeholder={t.generatedTest}
                />
                <div className="absolute bottom-4 right-4">
                  <Button
                    onClick={copyToClipboard}
                    disabled={!generatedTest}
                    className="flex items-center gap-2"
                  >
                    <ClipboardCopyIcon className="w-4 h-4" />
                    {t.copyTest}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {t.copyInstructions}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}