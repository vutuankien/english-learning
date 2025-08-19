create table vocabs(
    id serial primary key,
    word text not null,
    meaning text not null,
    type text,
    pronunciation text,
    unit text,
    created_at timestamp default current_timestamp
);

create table public.users (
    id uuid primary key references auth.users(id) on delete cascade,
    email text,
    created_at timestamp with time zone default now(),
    full_name text,
    role text default 'student',
    phone text,
    level integer default 1,
    image_url text default 'https://th.bing.com/th/id/R.e6453f9d07601043e5b928d25e129948?rik=JPSLKIXFf8DmmQ&pid=ImgRaw&r=0',
    grade integer default 1,
    is_active boolean default true
);
-- Tạo bảng courses
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    grade INTEGER DEFAULT 1,
    created_by TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    image_url TEXT DEFAULT 'https://th.bing.com/th/id/R.e6453f9d07601043e5b928d25e129948?rik=JPSLKIXFf8DmmQ&pid=ImgRaw&r=0'
);
-- Tạo bảng course_enrollments (mối quan hệ n-n giữa users và courses)
CREATE TABLE course_enrollments (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_enrolled BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (user_id, course_id)
);

create table questions (
    id uuid primary key default gen_random_uuid(),
    text text not null,
    difficulty text check (difficulty in ('easy', 'medium', 'hard')),
    created_at timestamptz default now(),
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    unit text
);
create table results (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade,
    question_id uuid references questions(id) on delete cascade,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE
    audio_url text not null,
    score_accuracy int check (score_accuracy between 0 and 100),
    score_fluency int check (score_fluency between 0 and 100),
    score_completeness int check (score_completeness between 0 and 100),
    score_pronunciation int check (score_pronunciation between 0 and 100),
    recognized_text text,
    created_at timestamptz default now()
);
create table speaking_results (
  id bigserial primary key,
  user_id uuid references users(id) on delete cascade,
  question_id uuid references questions(id) on delete cascade,
  transcript text,
  pronunciation numeric,
  fluency numeric,
  grammar_vocab numeric,
  content numeric,
  feedback text,
  created_at timestamp default now()
);

-- Tạo chỉ mục để tối ưu hóa truy vấn
CREATE INDEX idx_vocabs_course_id ON vocabs(course_id);
CREATE INDEX idx_course_enrollments_user_id ON course_enrollments(user_id);
CREATE INDEX idx_course_enrollments_course_id ON course_enrollments(course_id);
CREATE INDEX idx_questions_course_id ON questions(course_id);
CREATE INDEX idx_results_user_id ON results(user_id);
CREATE INDEX idx_results_question_id ON results(question_id);