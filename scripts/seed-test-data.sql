DROP TABLE IF EXISTS public.knocking;
CREATE TABLE public.knocking (
    id SERIAL,
    ip VARCHAR(30) NOT NULL,
    time TIMESTAMP NOT NULL,
    country VARCHAR(30),
    city VARCHAR(30),
    timezone VARCHAR(30)
);

