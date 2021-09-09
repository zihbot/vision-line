import dynaconf

settings = dynaconf.Dynaconf(
    settings_files=['settings.toml', '.secrets.toml'],
    environments=True,
)