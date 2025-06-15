
-- 1. Tabla de perfiles de usuario (con balance inicial en 0)
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  balance NUMERIC DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger para crear perfil al hacer signup automático
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Tabla de depósitos
CREATE TABLE public.deposits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'rejected'
  network TEXT,
  tx_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Habilita RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deposits ENABLE ROW LEVEL SECURITY;

-- RLS: Solo el usuario ve/edita su perfil:
CREATE POLICY "Usuarios pueden ver/editar su perfil"
ON public.profiles
FOR SELECT USING (auth.uid() = id);

-- RLS depósitos: ver sus depósitos
CREATE POLICY "Usuarios pueden ver depósitos propios"
ON public.deposits
FOR SELECT USING (auth.uid() = user_id);

-- RLS depósitos: insertar depósitos propios
CREATE POLICY "Usuarios pueden crear depósitos propios"
ON public.deposits
FOR INSERT WITH CHECK (auth.uid() = user_id);

