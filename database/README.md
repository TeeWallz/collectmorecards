[Migration docs](https://www.activestate.com/resources/quick-reads/how-to-manage-python-dependencies-with-virtual-environments/)


# Start with pipenv



## pipenv

> Pipenv is a tool that aims to bring the best of all packaging worlds (bundler, composer, npm, cargo, yarn, etc.) to the Python world.

- [pypa/pipenv: Python Development Workflow for Humans.](https://github.com/pypa/pipenv)



## Install all packages

```sh
pipenv sync --dev  # Installs all packages specified in Pipfile.lock.
```



## Run in shell

```sh
pipenv shell  # Spawns a shell within the virtualenv.
```

Or, run `help` with `pipenv run`

```sh
pipenv run help
```



## `pipenv run`

pipenv task are also defined by [Pipfile](https://github.com/peaceiris/mkdocs-material-boilerplate/blob/main/Pipfile)

```sh
pipenv run help       # mkdocs --help
```