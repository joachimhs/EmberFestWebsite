FROM ruby:2.7.3-alpine

ENV BUNDLER_VERSION=1.14.6
ENV PATH /app/bin:$PATH

RUN apk add --update --no-cache \
      binutils-gold \
      curl \
      file \
      g++ \
      gcc \
      git \
      less \
      libstdc++ \
      libffi-dev \
      libc-dev \
      make \
      netcat-openbsd \
      openssl \
      postgresql-dev \
      postgresql-client \
      tzdata

RUN gem install bundler -v $BUNDLER_VERSION

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle check || bundle install

COPY . ./

CMD ["bundle", "exec", "jekyll", "serve", "--host=0.0.0.0"]
